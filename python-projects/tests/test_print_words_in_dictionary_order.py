import unittest

from support import run_solution


class PrintWordsInDictionaryOrderTest(unittest.TestCase):
    def test_case_01_dog_cat(self):
        """dog cat."""
        result = run_solution('print-words-in-dictionary-order', 'dog cat\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, 'cat dog\n')

    def test_case_02_ebra_apple(self):
        """Zebra apple."""
        result = run_solution('print-words-in-dictionary-order', 'Zebra apple\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, 'apple Zebra\n')


if __name__ == "__main__":
    unittest.main()
