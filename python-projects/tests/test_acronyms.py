import unittest

from support import run_solution


class AcronymsTest(unittest.TestCase):
    def test_case_01_three_words(self):
        """three words."""
        result = run_solution('acronyms', 'International Business Machines\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, 'I.B.M\n')

    def test_case_02_three_words_2(self):
        """three words 2."""
        result = run_solution('acronyms', 'Object Oriented Programming\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, 'O.O.P\n')


if __name__ == "__main__":
    unittest.main()
