import unittest

from support import run_solution


class ConsonantsPhraseTest(unittest.TestCase):
    def test_case_01_hello_world(self):
        """hello world."""
        result = run_solution('consonants-phrase', 'hello world\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, 'hll wrld\n')

    def test_case_02_aeiou(self):
        """aeiou."""
        result = run_solution('consonants-phrase', 'aeiou\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '\n')


if __name__ == "__main__":
    unittest.main()
