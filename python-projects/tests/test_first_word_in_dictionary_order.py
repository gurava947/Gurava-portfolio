import unittest

from support import run_solution


class FirstWordInDictionaryOrderTest(unittest.TestCase):
    def test_case_01_abc_def(self):
        """abc def."""
        result = run_solution('first-word-in-dictionary-order', 'abc def\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '')

    def test_case_02_ello_world(self):
        """Hello world."""
        result = run_solution('first-word-in-dictionary-order', 'Hello world\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '')


if __name__ == "__main__":
    unittest.main()
